package validator

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate = validator.New(validator.WithRequiredStructEnabled())

func GetValidator() *validator.Validate {
	return validate
}

func ProcessErrors(err error) string {
	var output string

	for _, e := range err.(validator.ValidationErrors) {
		output = output + fmt.Sprintf("Field '%s' failed to check '%s'.\n", e.Field(), e.Tag())
	}

	return output
}
