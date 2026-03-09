Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # 通信を許可する相手（Next.jsのURL）を指定
    origins ENV.fetch("FRONTEND_URL") { "http://localhost:3001" }

    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
      expose: ["Authorization"]
  end
end
