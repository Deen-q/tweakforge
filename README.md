## How to test locally
Assuming Docker Desktop is installed:

1) Clone the repo
2) cd to said repo and then run: docker build -t tweakforge .
3) Run the container: docker run -d -p 3000:3000 tweakforge
4) Go to http://localhost:3000 in your browser
5) Stop the container when finished: docker stop tweakforge
6) Optional: docker rm tweakforge
