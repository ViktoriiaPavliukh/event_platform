/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)", // Apply this header to all routes
  //       headers: [
  //         {
  //           key: "Referrer-Policy",
  //           value: "no-referrer-when-downgrade",
  //         },
  //         {
  //           key: "Cross-Origin-Opener-Policy",
  //           value: "same-origin; require-same-origin-allow-popups",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["utfs.io"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "utfs.io",
//         port: "",
//       },
//     ],
//   },
//   async headers() {
//     return [
//       {
//         source: "/login",
//         headers: [
//           {
//             key: "Cross-Origin-Embedder-Policy",
//             value: "unsafe-none",
//           },
//           {
//             key: "Cross-Origin-Opener-Policy",
//             value: "same-origin; require-same-origin-allow-popups",
//           },
//         ],
//       },
//       {
//         // Apply this header to all routes
//         source: "/(.*)",
//         headers: [
//           {
//             key: "Referrer-Policy",
//             value: "no-referrer-when-downgrade",
//           },
//           {
//             key: "Cross-Origin-Opener-Policy",
//             value: "same-origin; require-same-origin-allow-popups",
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;
