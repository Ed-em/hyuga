require 'rails_helper'
RSpec.describe 'Genre function', type: :system do

  describe 'Create genre function' do
    before do
      User.create(email: 'test1@gmail.com',
                  password: 'passwd',
                  password_confirmation: 'passwd')
      visit new_user_session_path
      fill_in 'Email', with: 'test1@gmail.com'
      fill_in 'Password', with: 'passwd'
      click_button 'Log in'
      @user = User.first
    end
    context 'to be able to login' do
      it 'enables create new genre' do
        visit new_genre_path
        fill_in 'Name', with: 'Comedy'
        click_on 'Create Genre'
        expect(page).to have_content 'Comedy'
      end
    end
  end

  describe 'Edit genre function' do
    before do
      User.create(email: 'test1@gmail.com',
                  password: 'passwd',
                  password_confirmation: 'passwd')
      visit new_user_session_path
      fill_in 'Email', with: 'test1@gmail.com'
      fill_in 'Password', with: 'passwd'
      click_button 'Log in'
      @user = User.first
    end
    context 'to be able to login' do
      it 'enables edit new genre' do
        Genre.create(name: 'Action')
        @genre = Genre.first
        visit genres_path
        click_on 'Edit'
        fill_in 'Name', with: 'Comedy'
        click_button 'Update Genre'
        expect(page).to have_content 'genre was successfully updated.'
      end
    end
  end
  describe 'searh by genre function' do
  before do
    User.create(email: 'test1@gmail.com',
                password: 'passwd',
                password_confirmation: 'passwd')
    visit new_user_session_path
    fill_in 'Email', with: 'test1@gmail.com'
    fill_in 'Password', with: 'passwd'
    click_button 'Log in'
    @user = User.first
  end
    context 'to be able to login' do
      it 'enables search new genre' do
        visit root_path
        click_on 'Genres'
        expect(page).to have_content 'There are no books currently in this category'
      end
    end
  end

  describe 'Delete genre function' do
  before do
    User.create(email: 'test1@gmail.com',
                password: 'passwd',
                password_confirmation: 'passwd')
    visit new_user_session_path
    fill_in 'Email', with: 'test1@gmail.com'
    fill_in 'Password', with: 'passwd'
    click_button 'Log in'
    @user = User.first
  end
    context 'to be able to login' do
      it 'enables Delete new genre' do
        Genre.create(name: 'Action')
        @genre = Genre.first
        visit genres_path
        click_on 'Destroy'
      end
    end
  end
end
