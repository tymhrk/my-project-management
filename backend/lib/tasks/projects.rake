namespace :projects do
  desc 'プロジェクト全件をCSV出力する'
  task export_csv: :environment do
    puts 'Starting CSV Export...'
    path = Projects::CsvExportService.execute
    puts "Done! Saved to: #{path}"
  end
end
