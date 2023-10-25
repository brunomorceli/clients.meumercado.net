import { ICompany } from "../interfaces";

export class CategoriesUtils {
  private static iterateCategories(
    category: any,
    context: (item: any, parent: any | null, index: number) => void,
    parent: any = null,
    index = 0
  ) {
    const isArray = Array.isArray(category);
    let children: any[];
    if (isArray) {
      children = category;
    } else {
      context(category, parent, index);
      children = category.children || [];
    }
  
    for (let i = 0; i < children.length; i++) {
      this.iterateCategories(children[i], context, isArray ? null : category, i);
    }
  }

  static getPlainCategories(company: ICompany): any[] {
    const result: any[] = [];
    this.iterateCategories(company.categories, (category) => {
      result.push(category);
    });
  
    return result;
  }
}

