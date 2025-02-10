# Nginx Configuration to serve Next.js & Flask

# Server block for Flask API (Reverse Proxy)
server {
    listen 80;
    server_name your_domain_or_ip; # Replace with your domain or server IP

    location /api/ {
        proxy_pass http://127.0.0.1:5000/;  # Reverse proxy to Flask API
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Server block for Next.js frontend
    location / {
        proxy_pass http://127.0.0.1:3000;  # Reverse proxy to Next.js frontend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Serve static content for Next.js
    location /_next/ {
        root /home/waqas/frontend/out;  # Path to Next.js static files
        try_files $uri /index.html =404;
    }

    location /static/ {
        root /home/waqas/frontend/out;  # Path to Next.js static files
        try_files $uri /index.html =404;
    }

    # Optional: Handle 404 errors
    error_page 404 /404.html;
    location = /404.html {
        root /usr/share/nginx/html;
    }
}
-----------------------------------------------------
  [Unit]
Description=Gunicorn instance to serve Flask
After=network.target

[Service]
User=waqas
Group=nginx
WorkingDirectory=/home/waqas/backend
Environment="PATH=/home/waqas/backend/venv/bin"
ExecStart=/home/waqas/backend/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:5000 app:app

[Install]
WantedBy=multi-user.target
-----------------------------------------
  total 32
drwxrwxr-x. 7 waqas waqas   155 Feb 10 12:07 .
drwxr-xr-x. 4 root  root     35 Feb 10 11:46 ..
-rwxrwxr-x. 1 waqas waqas  1500 Feb 10 12:22 .bash_history
-rwxrwxr-x. 1 waqas waqas    18 Jan 28  2023 .bash_logout
-rwxrwxr-x. 1 waqas waqas   141 Jan 28  2023 .bash_profile
-rwxrwxr-x. 1 waqas waqas   492 Jan 28  2023 .bashrc
drwxrwxr-x. 3 waqas waqas    17 Feb 10 11:49 .cache
drwxrwxr-x. 4 waqas waqas    57 Feb 10 12:03 .config
drwxrwxr-x. 5 waqas waqas    84 Feb 10 12:01 .npm
drwxrwxr-x. 4 waqas waqas    51 Feb 10 12:23 backend
drwxrwxr-x. 7 waqas nginx 16384 Feb 10 12:15 frontend
[root@ip-172-31-13-29 waqas]# cd ..
[root@ip-172-31-13-29 home]# ls -al
total 0
drwxr-xr-x.  4 root     root      35 Feb 10 11:46 .
dr-xr-xr-x. 18 root     root     237 Feb  3 23:40 ..
drwx------.  3 ec2-user ec2-user  74 Feb 10 11:13 ec2-user
drwxrwxr-x.  7 waqas    waqas    155 Feb 10 12:07 waqas
[root@ip-172-31-13-29 home]#
