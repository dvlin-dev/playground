# mcp-search
联网搜索 mcp

# docker 
docker build --platform linux/amd64 -t mcp-search -f Dockerfile .

docker tag mcp-search dvlindev/mcp-search
docker push dvlindev/mcp-search

docker pull dvlindev/mcp-search
docker run -d -p 0.0.0.0:5102:5102 -e EXA_API_KEY=your_api_key_here --name mcp-search dvlindev/mcp-search
