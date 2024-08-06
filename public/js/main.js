$(document).ready(function() {
    $('#search-button').on('click', function() {
      let query = $('#search-input').val();
      $.get(`/api/books/search?query=${query}`, function(data) {
        $('#books-container').empty();
        data.items.forEach(book => {
          $('#books-container').append(`
            <div class="book">
              <img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}">
              <h3>${book.volumeInfo.title}</h3>
              <p>${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors available'}</p>
              <p>${book.volumeInfo.description}</p>
              <button class="add-to-favorites" data-book-isbn="${book.volumeInfo.industryIdentifiers[0].identifier}">Add to Favorites</button>
            </div>
          `);
        });
      });
    });
  });
  
  $(document).on('click', '.add-to-favorites', function() {
    let isbn = $(this).data('book-isbn');
    console.log('Adding book with ISBN:', isbn); // Перевірка значення isbn
    $.post('/api/favorites/add', { isbn }, function(response) {
      alert(response.message);
    }).fail(function(error) {
      alert('Error adding to favorites');
    });
  });
  