set :output, 'log/cron.log'
set :environment, ENV['RAILS_ENV'] || 'development'

job_type :rake,
         'export PATH="$HOME/.rbenv/bin:$PATH"; eval "$(rbenv init -)"; cd :path && bundle exec rake :task --silent :output'

every 1.minute do
  rake 'projects:export_csv'
end
