require 'rails_helper'
describe 'User test', type: :system do

  describe 'User registration test' do
    context 'when you sign up' do
      it 'registers new users' do
        visit new_user_registration_path
        fill_in "Email",        with: "user@example.com"
        fill_in "Password",     with: "foobar"
        fill_in "Password confirmation", with: "foobar"
        expect{ click_button "Sign up" }.to change(User, :count).by(1)
      end
    end
  end

  describe 'Session functionality test' do
    before do
      User.create(email: 'user1@gmail.com',
                  password: 'password',
                  password_confirmation: 'password')
      visit new_user_session_path
      fill_in 'Email', with: 'user1@gmail.com'
      fill_in 'Password', with: 'password'
      click_button 'Log in'
      @user = User.first
    end
    context 'to be able to login' do
      it 'enables login' do
        expect(page).to have_content 'Signed in successfully'
      end
    end
    context 'to be able to logout' do
      it 'enables logout' do
        click_on 'Sign Out'
        expect(page).to have_content 'Signed out successfully'
      end
    end
  end

end
