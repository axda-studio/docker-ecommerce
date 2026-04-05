# Start with Node.js 22                                                                                                                                             
FROM node:22-alpine                                                                                                                                                 

# Enable pnpm (built into modern Node via corepack)                                                                                                                 
RUN corepack enable && corepack prepare pnpm@latest --activate                                                                                                      

# Go to this folder inside the container                                                                                                                            
WORKDIR /app                                                                                                                                                        

# Bring package files first (caching!)                                                                                                                           
COPY package.json pnpm-lock.yaml ./

# Install dependencies                                                                                                                                              
RUN pnpm install --frozen-lockfile                                                                                                                                  

# Now bring the rest of the code                                                                                                                                    
COPY . .                                                                                                                                                         

# Build Next.js
RUN pnpm build

# Next.js serves on port 3000                                                                                                                                       
EXPOSE 3000                                                                                                                                                         

# Start Next.js                                                                                                                                                     
CMD ["pnpm", "start"]      