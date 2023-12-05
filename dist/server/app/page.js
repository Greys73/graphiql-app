const CHUNK_PUBLIC_PATH = "server/app/page.js";
const runtime = require("../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/node_modules_7af480._.js");
runtime.loadChunk("server/chunks/[root of the server]__8b74a8._.js");
runtime.getOrInstantiateRuntimeModule("[node]/dist/server/app/page/actions.js (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-page.js/(COMPONENT_0)/[project]/src/app/page.tsx [rsc] (ecmascript, Next.js server component)/(COMPONENT_1)/[project]/src/app/layout.tsx [rsc] (ecmascript, Next.js server component)/(COMPONENT_2)/[project]/node_modules/next/dist/client/components/not-found-error.js [rsc] (ecmascript, Next.js server component) (ecmascript)", CHUNK_PUBLIC_PATH).exports;
