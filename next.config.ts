import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // The Make preview is served from a proxy origin; without this Next blocks
  // its dev resources and the page never hydrates (buttons do nothing).
  allowedDevOrigins: ['*.figma.site', '*.makeproxy-c.figma.site', '*.figma.com'],
}

export default nextConfig
