package models

type ErrorMessage struct {
	Message string `json:"error"`
}

type SuccessUserMessage struct {
	Message string `json:"message"`
	User    User   `json:"user,omitempty"`
}

type SuccessMessage struct {
	Message string `json:"message"`
}