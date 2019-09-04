/**
 * Helper to get property names of an object.
 * Useful when you need the property of an object as string. For example to map a data source to a table.
 * It shows you the available properties and typescript is going to validate if the property really exists.
 */
export abstract class NameOf {

    /**
     * Returns the `propertyName` as string.
     * @param propertyName A property name of the T object.
     */
    public static property<T>(propertyName: keyof T): string {
        return propertyName as string;
    }
}
