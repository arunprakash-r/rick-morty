import { Pipe, PipeTransform } from '@angular/core';

interface Comparer{
    (p1: any, p2: any): number
}
@Pipe({
    name : 'sort',
    pure : true
})
export class SortPipe implements PipeTransform{

    // Ascending order
    private getAscendingComparer(attrName) : Comparer {
        return function compareByCost(p1 : any, p2 : any) : number {
            if (p1[attrName] < p2[attrName]) return 1;
            if (p1[attrName] > p2[attrName]) return -1;
            return 0;
        }
    }

    // Descending order
    private getDescendingComparer(comparer) : Comparer {
        return function (p1 : any, p2 : any) : number {
            return comparer(p1, p2) * -1;
        }
    }

    transform(data : any[], sortName : string){
        console.log('sort.transform triggered');
        if (!data || !data.length || !sortName) return data;
        let comparer = this.getAscendingComparer('id');
        if(sortName === 'descending') comparer = this.getDescendingComparer(comparer);
        data.sort(comparer);
        return data;
    }
}