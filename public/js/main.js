
$(document).ready(function() {
    $('#search-button').on('click', function() {
      let query = $('#search-input').val();
      if (!query) {
        alert('Please enter a search query');
        return;
      }
      $('#search-input').val('');

      $.get(`/api/books/search?query=${query}`, function(data) {
        $('#books-container').empty();
        console.log('API Response:', data); 
      
        if (Array.isArray(data)) {
          data.forEach(function(book) {
            console.log(book);
            let isbn = book.isbn || 'N/A';
            let thumbnail = book.thumbnail || 'default-thumbnail.jpg';
            let title = book.title || 'No title available';
            let authors = book.authors ? book.authors.join(', ') : 'No authors available';
            let description = book.description || 'No description available';
  
            $('#books-container').append(`
              <div class="book">
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
                <p>${authors}</p>
                <p>${description}</p>
                <button class="add-to-favorites" data-book-isbn="${isbn}" data-book-title="${title}" data-book-thumbnail="${thumbnail}" data-book-authors="${authors}" data-book-description="${description}">Add to Favorites</button>
              </div>
            `);
          });
        } else {
          console.error('Data is undefined or not an array:', data);
          $('#books-container').append('<p>No books found.</p>');
        }
      }).fail(function(error) {
        console.error('Error:', error);
        $('#books-container').append('<p>Error retrieving books.</p>');
      });
    });
  
    $(document).on('click', '.add-to-favorites', function() {//add to favorites
      let isbn = $(this).data('book-isbn');
      let title = $(this).data('book-title');
      let thumbnail = $(this).data('book-thumbnail');
      let authors = $(this).data('book-authors');
      let description = $(this).data('book-description');
      
      if (!isbn) {
        console.error('ISBN is not defined');
        return;
      }
  
      $.ajax({
        
        url: '/api/favorites/add',
        method: 'POST',
        
        data: JSON.stringify({ isbn, title, thumbnail, authors, description }),
        contentType: 'application/json'
      }).done(function(response) {
        alert(response.message);
        loadFavorites();  
      }).fail(function(error) {
        console.error('Error adding to favorites:', error);
        alert('Error adding to favorites');
      });
    });


    // $(document).on('click', '.add-to-favorites', function() { //add to favorites
    //   let isbn = $(this).data('book-isbn');
    //   let title = $(this).data('book-title');
    //   let thumbnail = $(this).data('book-thumbnail');
    //   let authors = $(this).data('book-authors');
    //   let description = $(this).data('book-description');
  
    //   if (!isbn) {
    //     console.error('ISBN is not defined');
    //     return;
    //   }
  
    //   let book = {
    //     isbn: isbn,
    //     title: title,
    //     thumbnail: thumbnail,
    //     authors: authors,
    //     description: description
    //   };
  
    //   $.ajax({
    //     url: '/api/favorites/add',
    //     method: 'POST',
    //     data: JSON.stringify(book),
    //     contentType: 'application/json',
    //     success: function(data) {
    //       console.log('Book added to favorites:', data);
    //       // $('#favorites-container').css('display', 'block');
    //       loadFavorites();
    //     },
    //     error: function(error) {
    //       console.error('Error:', error);
    //       alert('Failed to add book to favorites');
    //     }
    //   });
    // });








  
    $(document).on('click', '.remove-from-favorites', function() {//remove from favorites
      let isbn = $(this).data('book-isbn');
      
      if (!isbn) {
        console.error('ISBN is not defined');
        return;
      }
  
      $.ajax({
        url: '/api/favorites/remove',
        method: 'POST',
        data: JSON.stringify({ isbn }),
        contentType: 'application/json'
      }).done(function(response) {
        alert(response.message);
        loadFavorites();  
      }).fail(function(error) {
        console.error('Error removing from favorites:', error);
        alert('Error removing from favorites');
      });
    });
  
    function loadFavorites() {
      $.get('/api/favorites', function(data) {
        $('#favorites-list').empty(); 
        if (Array.isArray(data)) {
          data.forEach(function(favorite) {
            let isbn = favorite.isbn || 'N/A';
            let title = favorite.title || 'No title available';
            let thumbnail = favorite.thumbnail || 'default-thumbnail.jpg';
            let authors = favorite.authors ? favorite.authors.join(', ') : 'No authors available';
            let description = favorite.description || 'No description available';
            
            $('#favorites-list').append(`
              <li>
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
                <p>${authors}</p>
                <p>${description}</p>
                <button class="remove-from-favorites" data-book-isbn="${isbn}">Remove from Favorites</button>
              </li>



            `);
          });
        } else {
          console.error('Favorites data is incorrect:', data);
        }
      }).fail(function(error) {
        console.error('Error retrieving favorites:', error);
      });
    }
  
    loadFavorites();  
  });