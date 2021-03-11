require 'rails_helper'
describe 'Movie test', type: :system do

  describe 'Movie functionality test' do
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
    context 'to be able to add movie' do
     it 'enables create new movie' do
       expect(page).to have_content 'Signed in successfully'
       Genre.create(name: 'Action')
       @genre = Genre.first
       visit root_path
       click_on 'Add Movie'
       select 'Action'
       fill_in 'Title', with: 'This movie'
       fill_in 'Playtime', with: '20'
       fill_in 'Director', with: 'Me'
       fill_in 'Description', with: 'Action packed movie'
       attach_file "/Users/edemdorfe/Desktop/screenshot.png"
       click_button 'Create Movie'
       expect(page).to have_content 'Movie posted for review'
     end
  end
  context 'to be able to edit movie' do
   it 'enables edit a movie' do
     expect(page).to have_content 'Signed in successfully'
     Genre.create(name: 'Action')
     @genre = Genre.first
     visit root_path
     click_on 'Add Movie'
     select 'Action'
     fill_in 'Title', with: 'This movie'
     fill_in 'Playtime', with: '20'
     fill_in 'Director', with: 'Me'
     fill_in 'Description', with: 'serving traditional foods'
     attach_file "/Users/edemdorfe/Desktop/screenshot.png"
     click_button 'Create Movie'
     expect(page).to have_content 'Movie posted for review'
     find("img[src*='screenshot.png']").click
     click_on 'Edit'
     select 'Action'
     fill_in 'Title', with: 'This movie'
     fill_in 'Playtime', with: '20'
     fill_in 'Director', with: 'Me'
     fill_in 'Description', with: 'Action packed movie'
     attach_file "/Users/edemdorfe/Desktop/screenshot.png"
     click_button "Update Movie"
    end
  end
  context 'to be able to edit movie' do
   it 'enables edit a movie' do
     expect(page).to have_content 'Signed in successfully'
     Genre.create(name: 'Action')
     @genre = Genre.first
     visit root_path
     click_on 'Add Movie'
     select 'Action'
     fill_in 'Title', with: 'This movie'
     fill_in 'Playtime', with: '20'
     fill_in 'Director', with: 'Me'
     fill_in 'Description', with: 'Action packed movie'
     attach_file "/Users/edemdorfe/Desktop/screenshot.png"
     click_button 'Create Movie'
     expect(page).to have_content 'Movie posted for review'
     find("img[src*='screenshot.png']").click
      click_on 'Destroy'
    end
  end
end
end
