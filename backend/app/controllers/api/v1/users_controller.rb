class Api::V1::UsersController < Api::V1::AuthController
  def show
    if current_user.nil?
      render json: { error: "認証が必要です" }, status: :unauthorized
      return
    end

    render_profile(current_user)
  end

  def update
    if current_user.update(user_params)
      render_profile(current_user)
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def render_profile(user)
    return render json: { error: 'Unauthorized' }, status: :unauthorized if user.nil?

    avatar_url = user.avatar.attached? ? url_for(user.avatar) : nil
    render json: user.as_json.merge(avatar_url: avatar_url)
  end

  def user_params
    params.require(:user).permit(:name, :bio, :avatar)
  end
end