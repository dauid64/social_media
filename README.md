# Projeto de Linguagens de Programação

<div align="center">
<img src="https://github.com/dauid64/diretorio_jornalistas_unb/assets/94979678/abf68be9-d2b8-4f96-a02b-92311fe0a665">
</div>

> Projeto final para a matéria de Linguagens de Programação com o objetivo de desenvolver um programa utilizando as inovações da linguagem Go, no caso o paralelismo, e apresentar sobre a linguagem.

## 📍 Sobre GoLang
Go foi criada por 3 programadores famosos da Google, sendo eles Robert Griesemer, Rob Pike e Ken Thompson. O objetivo do Go primordialmente era otimizar a capacidade de compilação dos códigos, por causa da grande demora que a Google enfrentava com o C++, porém não somente a melhora, mas também de fácil usabilidade para não necessitar de uma grande experiência e conhecimento de programadores para desenvolverem e realizarem a manutenção dos códigos.

## 📈 Domínio
A linguagem Go como já dito foi criada pela Google para solucionar problemas de produtividade que a Google enfrentava pelos seus vários servidores, então seu objetivo é essencialmente facilitar a programação de sistemas com maior rapidez e facilidade.

## 🧮 Paradigma
Essencialmente a linguagem Go possui o paradigma imperativo, porém ela possui vários conceitos de outras linguagens e criou seu próprio estilo de programação, como por exemplo ela possuir alguns métodos que permite a programação orientada a objetos, porém não tem hierarquia.


## 📝 Criterios de Avaliação
- Legibilidade - Go como seu proposito é uma linguagem simples com 25 palavras-chave diminuindo bastante o tempo de aprendizagem. Possuindo também vários tratamentos de errors por si só, como não poder declarar uma váriavel e não usa-la, não declarar a mesma váriavel 2 vezes, possuir um tratamento de erro bem especifico onde geralmente a função retorna o erro e você é praticamente obrigado a trata-lo e entre outros que facilita bastante a manutenção do código.

- Capacidade de Escrita - Possui vários atalhos que facilita o programador a desenvolver o seu código e deixa-lo mais limpo para manutenção, porém não fugindo do seu propósito de evitar o máximo a ambiguidade, um exemplo disso é Go não ter o operador ternário em sua estrutura, assim não permitindo várias maneiras de se executar o comando if por exemplo. Uma curiosidade também é que a linguagem não possui o loop convencional de várias linguagens chamado "while", sendo facilmente substituido pelo "for", o que pessoalmente é um ponto bastante positivo. Contendo suporte a abstração por meio de interfaces.

- Confiabilidade - Contendo checagem de tipo estática é bastante completa se tratando de verficação, podendo ser declarada de uma unica maneira especificando seu tipo ou usando o operador de declaração curta ":=" possibilitando  atribuir um valor a váriavel sem especificar seu tipo, nesse caso o próprio compilador do Go infere o tipo da váriavel de acordo com o valor passado, não deixando e inferindo erro na hora se o usuário da linguagem atribuir um valor sem declarar, declarar duas vezes a mesma váriavel ou declarar e não usar uma váriavel. Também possui "Garbage Collector" para otimizar o desempenho da memória excluindo ponteiros nulos ou que não estão sendo mais utilizados.

- Custo - Com uma sintaxe curta e simples, Go é uma linguagem simples de aprender comparada a C++, C, Java e etc. Não exigindo grande experiência do programador para trabalhar com concorrência e otimizando bastante o tempo de compilação por ser uma linguagem nova e consequentemente aumentando a produtividade.

- Outros - Por fim, tem uma documentação bastante clara e completa no site oficial: https://go.dev/doc/. Sendo multiplataforma suportando as maiorias dos sistemas operacionais como Windows, macOS, Linux e outras plataformas UNIX.

## 👨‍💻 Exemplos 
1 ) Programa utilizando interface para atribuir uma abstração para as structs retangulo e circulo, atribuindo o tipo "forma" em toda struct que tiver o método "area()", e assim, a função "escreverArea" pode dinâmicamente utilizar o método "area()" independentemente de ser retangulo ou circulo (polimorfismo).
```

package main

import (
	"fmt"
	"math"
)

type retangulo struct {
	altura  float64
	largura float64
}

type circulo struct {
	raio float64
}

type forma interface {
	area() float64
}

func escreverArea(f forma) {
	fmt.Printf("A área de forma é %0.2f\n", f.area())
}

func (r retangulo) area() float64 {
	return r.altura * r.largura
}


func (c circulo) area() float64 {
	return math.Pi * math.Pow(c.raio, 2)
}

func main() {
	r := retangulo{10, 15}
	escreverArea(r)

	c := circulo{10}
	escreverArea(c)
}
```
2 )
Programa que demonstra a programação concorrente utilizando o select, 
basicamente cria duas funções anonimas, uma executando em meio segundo e outra em 2 segundos, 
assim executo outro for infinito com um select dentro que toda vez que algum canal estiver enviando uma mensagem
ele imprime na tela a mensagem recebida, entao teremos sempre 4 mensagens do canal 1 e depois 1 do canal 2 e assim infinitamente (Para parar o programa basta executar crtl + c).

EXCESSÃO: na primeira execução ira aparecer 3 mensagem do primeiro canal, pois existe a demora da execução do código, demonstrando que o select se aciona no canal que enviar a mensagem primeiro.
```

package main

import (
	"fmt"
	"time"
)

func main() {
	canal1, canal2 := make(chan string), make(chan string)

	go func() {
		for {
			time.Sleep(time.Millisecond * 500)
			canal1 <- "Canal 1"
		}
	}()

	go func() {
		for {
			time.Sleep(time.Second * 2)
			canal2 <- "Canal 2"
		}
	}()

	for {
		select {
		case mensagemCanal1 := <- canal1:
			fmt.Println(mensagemCanal1)
		case mensagemCanal2 := <- canal2:
			fmt.Println(mensagemCanal2)
		}
	}
}
```

## 🚀 Instalação do Site
1) Primeiro você tera que criar um arquivo na API e na aplicação WEB chamado ".env" e copiar o arquivo já existente ".env-example", básicamente essas são as váriaveis de ambiente do seu projeto, então configure de acordo com os seus dados.

2) Crie o banco MySQL de acordo com as váriaveis de ambiente do seu projeto e execute o comando SQL localizado na pasta api/sql/sql.sql

3) depois basta executar o comando executavel da API e da aplicação WEB ou rodar em dois prompts o comando: ``` go run main.go ```
