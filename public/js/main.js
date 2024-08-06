$(document).ready(function() {
    $('#search-button').on('click', function() {
        let query = $('#search-input').val();
        $.get(`/api/books/search?query=${query}`, function(data) {
            $('#books-container').empty();
            console.log('API Response:', data); 

            if (data !== undefined && Array.isArray(data)) {
                data.forEach(book => {
                    console.log('Book data:', book); 

                    let volumeInfo = book.volumeInfo || {};
                    let thumbnail = (volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail) ? volumeInfo.imageLinks.thumbnail : 'default-thumbnail.jpg';
                    let title = volumeInfo.title || 'No title available';
                    let authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'No authors available';
                    let description = volumeInfo.description || 'No description available';
                    let isbn = (volumeInfo.industryIdentifiers && volumeInfo.industryIdentifiers.length > 0) ? volumeInfo.industryIdentifiers[0].identifier : 'N/A';
                    
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
        let isbn = $(this).data('book-isbn');
        console.log('Adding book with ISBN:', isbn); // Перевірка значення isbn
        $.post('/api/favorites/add', { isbn }, function(response) {
            alert(response.message);
        }).fail(function(error) {
            alert('Error adding to favorites');
        });
    });
});
