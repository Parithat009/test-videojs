FROM node:lts-alpine as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
ENV NEXT_PUBLIC_URL=APP_NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_ENV=APP_NEXT_PUBLIC_ENV
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

FROM node:lts-alpine as runner
WORKDIR /app
ENV NODE_ENV=production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# EXPOSE 3000
CMD ["yarn", "start"]

# # Install dependencies only when needed
# FROM node:lts-alpine AS deps

# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# # Rebuild the source code only when needed
# # This is where because may be the case that you would try
# # to build the app based on some `X_TAG` in my case (Git commit hash)
# # but the code hasn't changed.
# FROM node:lts-alpine AS builder

# ENV NODE_ENV=production
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# RUN yarn build

# # Production image, copy all the files and run next
# FROM node:lts-alpine AS runner

# ARG X_TAG
# WORKDIR /app
# ENV NODE_ENV=production
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# CMD ["node_modules/.bin/next", "start"]