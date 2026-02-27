FROM ruby:3.4.2-slim

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
      libyaml-dev \
      git \
      tzdata && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 3000

CMD ["/bin/sh", "-c", "rm -f /app/tmp/pids/server.pid && bundle exec rails s -b '0.0.0.0'"]