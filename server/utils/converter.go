package utils

import "encoding/json"

func ConvertType[T any](val map[string]any) T {
	jsonData, err := json.Marshal(val)
	if err != nil {
		panic(err)
	}

	var v T
	err = json.Unmarshal(jsonData, &v)
	if err != nil {
		panic(err)
	}

	return v
}

func ToJson(v any) string {
	jsonData, err := json.Marshal(v)
	if err != nil {
		panic(err)
	}

	return string(jsonData)
}

func FromJson[T any](data string) T {
	var v T
	err := json.Unmarshal([]byte(data), &v)
	if err != nil {
		panic(err)
	}

	return v
}
