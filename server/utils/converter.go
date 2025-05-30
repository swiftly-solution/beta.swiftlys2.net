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
