$(document).ready(function() {
  $('#search-button').on('click', function() {


    let query = $('#search-input').val();
    if (!query) {
      alert('Please enter a search query');
      return;
    }
    $.get(`/api/books/search?query=${query}`, function(data) {
      $('#books-container').empty();
      console.log('API Response:', data); 
    
      if (Array.isArray(data)) {
        data.forEach(function(book) {
          let thumbnail = book.thumbnail || 'default-thumbnail.jpg';
          let title = book.title || 'No title available';
          let authors = book.authors ? book.authors.join(', ') : 'No authors available';
          let description = book.description || 'No description available';
          let isbn = book.isbn || 'N/A';

          $('#books-container').append(`
            <div class="book">
              <img src="${thumbnail}" alt="${title}">
              <h3>${title}</h3>
              <p>${authors}</p>
              <p>${description}</p>
              <button class="add-to-favorites" data-book-isbn="${isbn}">Add to Favorites</button>
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

  $(document).on('click', '.add-to-favorites', function() {
    let isbn = $(this).parent().find('img').attr('alt');
    // let isbn = $(this).data('book-isbn');
    console.log('Adding book with ISBN:', isbn); 
    $.ajax({
      url: '/api/favorites/add',
      method: 'POST',
      data: JSON.stringify({ isbn }),
      contentType: 'application/json'
    }).done(function(response) {
      alert(response.message);
    }).fail(function(error) {
      console.error('Error adding to favorites:', error);
      alert('Error adding to favorites');
    });
  });




});



