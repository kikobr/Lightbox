### Classe person ###
class Person
  constructor: -> 
    @firstName = 'Patrick'
    @lastName = 'Steele'
  fullName: -> 
    @teste = 'teste'
    @firstName + ' ' + @lastName

class Aluno extends Person
  constructor: -> @teste()
  teste: ->
    
alert 'aaaaaaeeeeeeee'
