# app/services/projects/csv_export_service.rb
require 'csv'

module Projects
  class CsvExportService
    EXPORT_DIRECTORY = Rails.root.join('tmp', 'csv', 'projects')

    CSV_COLUMNS = %w[id name description created_at updated_at].freeze

    def self.execute
      new.execute
    end

    def execute
      FileUtils.mkdir_p(EXPORT_DIRECTORY)
      file_path = EXPORT_DIRECTORY.join("projects_#{Time.current.strftime('%Y%m%d%H%M')}.csv")

      CSV.open(file_path, 'w', encoding: 'SJIS', invalid: :replace, undef: :replace) do |csv|
        csv << CSV_COLUMNS

        Project.find_each(batch_size: 1000) do |project|
          row = CSV_COLUMNS.map do |column|
            value = project.send(column)
            
            if value.is_a?(ActiveSupport::TimeWithZone)
              value.strftime('%Y-%m-%d %H:%M:%S')
            else
              value
            end
          end

          csv << row
        end
      end

      file_path
    rescue => e
      Rails.logger.error "CSV Export Failed: #{e.message}"
      raise e
    end
  end
end