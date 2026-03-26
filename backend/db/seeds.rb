require 'bcrypt'

puts "--- シードデータの作成を開始します ---"

if Rails.env.development?
  puts "既存のテストユーザーを削除中..."
  User.where("email LIKE ?", "test%@example.com").delete_all
end

password = "password"
encrypted_password = BCrypt::Password.create(password)

total_count = 10000
batch_size = 1000

(total_count / batch_size).times do |i|
  start_num = i * batch_size
  
  users = batch_size.times.map do |j|
    num = start_num + j
    {
      name: "TestUser#{num}",
      email: "test#{num}@example.com",
      encrypted_password: encrypted_password,
      jti: SecureRandom.uuid,
      created_at: Time.current,
      updated_at: Time.current
    }
  end

  User.insert_all(users)
  puts "#{(i + 1) * batch_size} 件作成完了..."
end

puts "--- 完了！ (Total: #{User.count}件) ---"