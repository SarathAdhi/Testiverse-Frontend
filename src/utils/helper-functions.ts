export const removeSpecialCharacters = (
  value: string,
  isConvertToSlug = true
) =>
  isConvertToSlug
    ? value
        .toLowerCase()
        .replace(/[^\p{L}\d\s]+/gu, "")
        .replaceAll(" ", "-")
    : value.replace(/[^\p{L}\d\s]+/gu, "");

import { FieldValues, UseFormStateReturn } from "react-hook-form";

export const getDirtyValues = <T extends Record<string, unknown>>(
  allFields: T,
  dirtyFields: UseFormStateReturn<FieldValues>["dirtyFields"]
): Partial<T> => {
  const changedFieldValues: Partial<T> = {};

  // Iterate over each field in dirtyFields
  for (const currentField in dirtyFields) {
    if (dirtyFields.hasOwnProperty(currentField)) {
      const fieldPath = currentField.split(".");

      // Check if the current field or any nested field is marked as dirty
      const isDirty = fieldPath.reduce((current, key) => {
        return current[key] !== undefined ? current[key] : false;
      }, dirtyFields);

      if (isDirty) {
        // Retrieve the corresponding value from allFields
        const fieldValue = fieldPath.reduce<unknown>((current, key) => {
          return current && typeof current === "object" && key in current
            ? (current as Record<string, unknown>)[key]
            : undefined;
        }, allFields);

        // Type assertion to inform TypeScript that currentField is a valid key on Partial<T>
        changedFieldValues[currentField as keyof Partial<T>] =
          fieldValue as Partial<T>[keyof Partial<T>];
      }
    }
  }

  return changedFieldValues;
};

export const getChangedValues = <T>(
  initialValues: T,
  currentValues: T
): Partial<T> => {
  const changedValues: Partial<T> = {};

  for (const key in currentValues) {
    if (
      currentValues?.hasOwnProperty(key) &&
      initialValues[key] !== currentValues[key]
    ) {
      changedValues[key as keyof T] = currentValues[key];
    }
  }

  return changedValues;
};
