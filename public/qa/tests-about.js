suite('"About" Page Tests', function(){
  test('page should have a link to contact page', function(){
    assert($('a[href="/contact"]').length);
  });
});
