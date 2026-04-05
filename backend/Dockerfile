# Start with Node.js 22 (the base ingredient)                                                                                                                       
FROM node:22-alpine                                                                                                                                                 

# Go to this folder inside the container                                                                                                                            
WORKDIR /app                                                                                                                                                        

# Bring package files first (for caching — we'll explain later)                                                                                                     
COPY package.json package-lock.json ./                                                                                                                              

# Install dependencies                                                                                                                                              
RUN npm ci                                                                                                                                                     

# Now bring the rest of the code                                                                                                                                    
COPY . .                                                                                                                                                            

# Build Strapi                                                                                                                                                      
RUN npm run build                                                                                                                                                

# Strapi serves on port 1337
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]  