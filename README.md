## How to test locally
Assuming Docker Desktop is installed:

1) Clone the repo
2) cd to said repo and then run: docker build -t winprefs .
3) Run the container: docker run -d -p 3000:3000 winprefs
4) Go to http://localhost:3000 in your browser
5) Stop the container when finished: docker stop <winprefs>
6) Optional: docker rm winprefs

## Name is pending
Apologies for discrepencies between the repo name and naming throughout the project
