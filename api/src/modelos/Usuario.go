package modelos

import (
	"api/src/seguranca"
	"errors"
	"strings"
	"time"

	"github.com/badoux/checkmail"
)

// Usuario representa um usuário utilizando a rede social
type Usuario struct {
	ID uint64 `json:"id,omitempty"` // omite o dado se o valor for o valor em branco
	Nome string `json:"nome,omitempty"`
	Nick string `json:"nick,omitempty"`
	Email string `json:"email,omitempty"`
	Senha string `json:"senha,omitempty"`
	CriadoEm time.Time `json:"CriadoEm,omitempty"` // O valor zero time não é considerado um valor em branco
}

// Preparar vai chamar os métodos para validar e formatar o usuário recebido
func (usuario *Usuario) Preparar(etapa string) error {
	if erro := usuario.validar(etapa); erro != nil {
		return erro
	}

	if erro := usuario.formatar(etapa); erro != nil {
		return erro
	}

	return nil
}

func (usurio *Usuario) validar(etapa string) error {
	if usurio.Nome == "" {
		return errors.New("o nome é obrigatório e não pode estar em branco")
	}
	if usurio.Nick == "" {
		return errors.New("o nick é obrigatório e não pode estar em branco")
	}
	if usurio.Email == "" {
		return errors.New("o e-mail é obrigatório e não pode estar em branco")
	}
	if erro := checkmail.ValidateFormat(usurio.Email); erro != nil {
		return errors.New("o e-mail inserido é invalido")
	}
	if etapa == "cadastro" && usurio.Senha == "" {
		return errors.New("a senha é obrigatório e não pode estar em branco")
	}

	return nil
}

func (usuario *Usuario) formatar(etapa string) error {
	usuario.Nome = strings.TrimSpace(usuario.Nome)
	usuario.Nick = strings.TrimSpace(usuario.Nick)
	usuario.Email = strings.TrimSpace(usuario.Email)

	if etapa == "cadastro" {
		senhaComHash, erro := seguranca.Hash(usuario.Senha)
		if erro != nil {
			return erro
		}

		usuario.Senha = string(senhaComHash)
	}

	return nil
}