#!/usr/bin/env node
import { access, constants } from "node:fs/promises";
import { createServer as createNetServer } from "node:net";
import { resolve } from "node:path";
import { argv, cwd, env, exit, platform } from "node:process";
import { spawn } from "node:child_process";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 3278;

main().catch((error) => {
  console.error(`flutter-web-preview: ${error.message}`);
  exit(1);
});

async function main() {
  const options = parseArgs(argv.slice(2));
  const projectDir = resolve(options.project ?? cwd());
  const host = options.host ?? DEFAULT_HOST;
  const port = options.port ?? await findOpenPort(host, DEFAULT_PORT);
  const flutter = options.flutter ?? env.FLUTTER ?? "flutter";

  await assertFlutterProject(projectDir);

  const flutterArgs = buildFlutterArgs({ ...options, host, port });
  const previewHost = host === "0.0.0.0" ? "127.0.0.1" : host;
  const previewUrl = `http://${previewHost}:${port}/`;

  console.log(`flutter-web-preview launching ${projectDir}`);
  console.log(`Preview at ${previewUrl}`);
  console.log(`Open this exact URL in the visible Codex side-panel browser: ${previewUrl}`);
  console.log(`Command: ${quoteCommand([flutter, ...flutterArgs])}`);
  console.log("Keep this terminal open. Use the Flutter run session for hot reload and logs.");

  const child = spawn(flutter, flutterArgs, {
    cwd: projectDir,
    env,
    shell: platform === "win32",
    stdio: "inherit",
  });

  let stopping = false;
  for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"]) {
    process.on(signal, () => {
      if (!stopping) {
        stopping = true;
        child.kill(signal);
      }
      setTimeout(() => exit(0), 5000).unref();
    });
  }

  child.on("exit", (code, signal) => {
    if (signal) {
      console.log(`flutter-web-preview stopped by ${signal}`);
      exit(0);
    }
    exit(code ?? 0);
  });

  child.on("error", (error) => {
    console.error(`Failed to start ${flutter}: ${error.message}`);
    exit(1);
  });
}

function parseArgs(args) {
  const options = {
    dartDefines: [],
    dartDefineFromFiles: [],
    extraArgs: [],
    mode: "debug",
  };

  for (let index = 0; index < args.length; index += 1) {
    const raw = args[index];
    if (raw === "--") {
      options.extraArgs = args.slice(index + 1);
      break;
    }

    const { flag, inlineValue } = splitFlag(raw);
    if (flag === "--help" || flag === "-h") {
      printHelp();
      exit(0);
    } else if (flag === "--project" || flag === "-C") {
      options.project = readValue(args, ++index, raw, inlineValue);
    } else if (flag === "--flutter") {
      options.flutter = readValue(args, ++index, raw, inlineValue);
    } else if (flag === "--host") {
      options.host = readValue(args, ++index, raw, inlineValue);
    } else if (flag === "--port" || flag === "-p") {
      options.port = parsePort(readValue(args, ++index, raw, inlineValue));
    } else if (flag === "--target" || flag === "-t") {
      options.target = readValue(args, ++index, raw, inlineValue);
    } else if (flag === "--flavor") {
      options.flavor = readValue(args, ++index, raw, inlineValue);
    } else if (flag === "--dart-define") {
      options.dartDefines.push(readValue(args, ++index, raw, inlineValue));
    } else if (flag === "--dart-define-from-file") {
      options.dartDefineFromFiles.push(readValue(args, ++index, raw, inlineValue));
    } else if (flag === "--profile") {
      options.mode = "profile";
    } else if (flag === "--release") {
      options.mode = "release";
    } else if (flag === "--debug") {
      options.mode = "debug";
    } else {
      throw new Error(`Unknown argument: ${raw}`);
    }

    if (inlineValue !== undefined) {
      index -= 1;
    }
  }

  return options;
}

function splitFlag(raw) {
  if (!raw.startsWith("--")) {
    return { flag: raw, inlineValue: undefined };
  }
  const equalsIndex = raw.indexOf("=");
  if (equalsIndex === -1) {
    return { flag: raw, inlineValue: undefined };
  }
  return {
    flag: raw.slice(0, equalsIndex),
    inlineValue: raw.slice(equalsIndex + 1),
  };
}

function readValue(args, index, flag, inlineValue) {
  if (inlineValue !== undefined) {
    if (inlineValue.length === 0) {
      throw new Error(`Pass a value after ${flag}.`);
    }
    return inlineValue;
  }

  const value = args[index];
  if (!value || value.startsWith("-")) {
    throw new Error(`Pass a value after ${flag}.`);
  }
  return value;
}

function parsePort(value) {
  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("--port must be an integer between 1 and 65535.");
  }
  return port;
}

function buildFlutterArgs(options) {
  const args = [
    "run",
    "-d",
    "web-server",
    "--web-hostname",
    options.host,
    "--web-port",
    String(options.port),
  ];

  if (options.mode === "profile") {
    args.push("--profile");
  } else if (options.mode === "release") {
    args.push("--release");
  }

  if (options.target) {
    args.push("-t", options.target);
  }

  if (options.flavor) {
    args.push("--flavor", options.flavor);
  }

  for (const define of options.dartDefines) {
    args.push("--dart-define", define);
  }

  for (const file of options.dartDefineFromFiles) {
    args.push("--dart-define-from-file", file);
  }

  args.push(...options.extraArgs);
  return args;
}

async function assertFlutterProject(projectDir) {
  await access(projectDir, constants.R_OK);
  await access(resolve(projectDir, "pubspec.yaml"), constants.R_OK).catch(() => {
    throw new Error(`No pubspec.yaml found in ${projectDir}. Pass --project /path/to/flutter/app.`);
  });
}

function findOpenPort(host, startPort) {
  return new Promise((resolvePort, reject) => {
    const server = createNetServer();
    server.unref();
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE" && startPort < 65535) {
        findOpenPort(host, startPort + 1).then(resolvePort, reject);
      } else {
        reject(error);
      }
    });
    server.listen({ host, port: startPort }, () => {
      const address = server.address();
      const selectedPort = typeof address === "object" && address ? address.port : startPort;
      server.close(() => resolvePort(selectedPort));
    });
  });
}

function quoteCommand(parts) {
  return parts.map((part) => {
    if (/^[A-Za-z0-9_./:@=-]+$/.test(part)) {
      return part;
    }
    return `'${part.replaceAll("'", "'\\''")}'`;
  }).join(" ");
}

function printHelp() {
  console.log(`flutter-web-preview

Run a Flutter web-server target for previewing inside the visible Codex side-panel browser.

Usage:
  flutter-web-preview [--project /path/to/app] [--port 3278]

Options:
  --project, -C              Flutter project directory. Defaults to cwd.
  --flutter                  Flutter executable path. Defaults to FLUTTER or PATH.
  --host                     Web hostname. Defaults to ${DEFAULT_HOST}.
  --port, -p                 Web port. Defaults to first free port from ${DEFAULT_PORT}.
  --target, -t               Dart entrypoint such as lib/main_preview.dart.
  --flavor                   Flutter flavor to pass through.
  --dart-define              Repeatable Dart define.
  --dart-define-from-file    Repeatable Dart define file.
  --debug                    Debug mode. Default.
  --profile                  Profile mode.
  --release                  Release mode.
  --                         Pass remaining arguments directly to flutter run.

Example:
  node skills/flutter-browser-preview/scripts/flutter-web-preview.mjs \\
    --project "$PWD" \\
    --target lib/main.dart \\
    --port 3278 \\
    --dart-define FEATURE_PREVIEW=true
`);
}
