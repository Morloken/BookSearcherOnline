$(document).ready(function() {
    $('#search-button').on('click', function() {
      let query = $('#search-input').val();
      $.get(`/api/books/search?query=${query}`, function(data) {
        $('#books-container').empty();
        data.forEach(book => {
            //shablon
          $('#books-container').append(`
            <div class="book">
              <img src="${book.thumbnail}" alt="${book.title}">
              <h3>${book.title}</h3>
              <p>${book.authors.join(', ')}</p>
              <p>${book.description}</p>
              <button class="add-to-favorites" data-book-id="${book.id}">Add to Favorites</button>
            </div>
          `);
        });
      });
    });
  
    $(document).on('click', '.add-to-favorites', function() {// add to favorites button
      let bookId = $(this).data('book-id');
      $.post('/api/favorites/add', { bookId }, function(response) {
        alert(response.message);
      });
    });
  });