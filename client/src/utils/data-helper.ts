export function objectToFormData(
  obj: Record<string, any>,
  formData = new FormData(),
  namespace: string | null = null
) {
  for (let propertyName in obj) {
    if (isValidProperty(obj, propertyName)) {
      const formKey = getFormKey(namespace, propertyName);

      appendToFormData(formData, formKey, obj[propertyName]);
    }
  }
  return formData;
}

function isValidProperty(obj: Record<string, any>, propertyName: string) {
  return (
    Object.prototype.hasOwnProperty.call(obj, propertyName) &&
    obj[propertyName] !== undefined &&
    obj[propertyName] !== null
  );
}

function getFormKey(namespace: string | null, propertyName: string) {
  return namespace ? `${namespace}[${propertyName}]` : propertyName;
}

function appendToFormData(formData: FormData, formKey: string, value: any) {
  if (value instanceof Date) {
    appendAsDate(formData, formKey, value);
  } else if (isObjectButNotFile(value)) {
    objectToFormData(value, formData, formKey);
  } else {
    formData.append(formKey, value);
  }
}

function appendAsDate(
  formData: FormData,
  formKey: string,
  date: Date | string
) {
  formData.append(formKey, new Date(date).toISOString());
}

function isObjectButNotFile(value: any) {
  return typeof value === "object" && !(value instanceof File);
}
