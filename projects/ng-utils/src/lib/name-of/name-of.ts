/**
 * Helper to get property names of an object.
 * Useful when you need the property of an object as string. For example to map a data source to a table.
 * It shows you the available properties and typescript is going to validate if the property really exists.
 */
export abstract class NameOf {

    /**
     * Returns the `propertyName` as string.
     * @param propertyName A property name of the T object.
     *
     * @example Set the text and value field to a drop-down component.
     *
     * ```ts
     * export class ProductModel {
     *   public id: number;
     *   public name: string;
     * }
     *
     * @Component({
     *   selector: 'app-product',
     *   templateUrl: './product.component.html',
     *   styleUrls: ['./product.component.css']
     * })
     * export class ProductComponent implements AfterViewInit {
     *   @ViewChild(DropdownComponent, {static: false})
     *   private dropdown: DropdownComponent;
     *
     *   public ngAfterViewInit() {
     *     dropdown.textField = NameOf.property<ProductModel>('name');
     *     dropdown.valueField = NameOf.property<ProductModel>('id');
     *   }
     * }
     * ```
     *
     */
    public static property<T>(propertyName: keyof T): string {
        return propertyName as string;
    }
}
