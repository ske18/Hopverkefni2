export async function getList(type ='all', id=null){
    const listi = await fetchList();
    if(type === 'all'){
        return listi.items;
    }
    if (type === 'category'){
        return listi.items.filter((item)=>{
            return item.category===id;
        });
    }
    if (type === 'tag'){
        return listi.items.filter((item)=>{
            return true;
        });
    }
    if(type === 'vefforrit')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    if(type === 'skipulag')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    if(type === 'vefþjónustur')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    if(type === 'framendi')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    if(type === 'Html')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    if(type === 'fundir')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    if(type === 'hönnun')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    if(type === 'bakendi')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    if(type === 'gagnagrunnur')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    if(type === 'ráðning')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    if(type === 'framework')((item)=>{
        return listi.item.filter((item)=>{
            return item.category===id;
        });
    })
    
}