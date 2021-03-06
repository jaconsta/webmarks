FROM golang:1.11 AS builder

# Download and install the latest release of dep
ADD https://github.com/golang/dep/releases/download/v0.5.0/dep-linux-amd64 /usr/bin/dep
RUN chmod +x /usr/bin/dep

# Compile
WORKDIR $GOPATH/src/github.com/jaconsta/webmarks
COPY Gopkg.toml Gopkg.lock ./
RUN dep ensure --vendor-only
# Copy and build
COPY . ./
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix nocgo -o /app .

# Install certificates for https calls
FROM alpine:3.6 as certificates

RUN apk add -U --no-cache ca-certificates

# Start over
FROM scratch

EXPOSE 8080

COPY --from=certificates /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app ./
ENTRYPOINT ["./app"]
CMD [""]
