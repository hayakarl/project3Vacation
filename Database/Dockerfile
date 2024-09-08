# Inherit current image from MySQL image:
FROM mysql:8

# Copy vacations.sql into /docker-entrypoint-initdb.d special folder which executes scripts only once:
COPY ./vacations.sql /docker-entrypoint-initdb.d
