require 'csv'

module Projects
  class CsvExportService
    EXPORT_DIRECTORY = Rails.root.join('tmp/csv/projects')

    def execute
      prepare_directory
      file_path = generate_csv_file
      Rails.logger.debug { "Done! Saved to: #{file_path}" }
    rescue StandardError => e
      Rails.logger.debug { "Failed to export CSV: #{e.message}" }
    end

    private

    def prepare_directory
      FileUtils.mkdir_p(EXPORT_DIRECTORY)
    end

    def generate_file_path
      timestamp = Time.current.strftime('%Y%m%d%H%M')
      EXPORT_DIRECTORY.join("projects_#{timestamp}.csv")
    end

    def generate_csv_file
      path = generate_file_path
      CSV.open(path, 'w') do |csv|
        csv << ['ID', 'Project Name', 'Status', 'Created At']
        write_project_rows(csv)
      end
      path
    end

    def write_project_rows(csv)
      Project.find_each do |project|
        csv << [
          project.id,
          project.name,
          project.status,
          project.created_at.strftime('%Y-%m-%d %H:%M')
        ]
      end
    end
  end
end
