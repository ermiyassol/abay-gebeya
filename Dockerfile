FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

#NEXT_BASE_URL = 'https://one-platform-float-management-oat.mpesa.safaricomet.net/'
#AUTH_SECRET = 'eJtJjpuQkaJ6QQ+0O6vByg3SKVTJHsx5fn7PhYsL1GA='
#NEXTAUTH_URL = 'http://localhost:3000'
#NEXT_PUBLIC_CTAPP_BASE_URL = 'https://one-platform-float-management-oat.mpesa.safaricomet.net/'

# ENV NEXT_BASE_URL= https://one-platform-float-management-oat.mpesa.safaricomet.net/
# ENV AUTH_SECRET= eJtJjpuQkaJ6QQ+0O6vByg3SKVTJHsx5fn7PhYsL1GA=
# ENV NEXTAUTH_URL= http://localhost:3000
# ENV NEXT_PUBLIC_CTAPP_BASE_URL= https://one-platform-float-management-oat.mpesa.safaricomet.net/


# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Run build with the preferred package manager
# RUN \
# if [ -f yarn.lock ]; then yarn build; \
# elif [ -f package-lock.json ]; then npm run build; \
# elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
# else echo "Lockfile not found." && exit 1; \
# fi


# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output

CMD ["node", "server.js"]
