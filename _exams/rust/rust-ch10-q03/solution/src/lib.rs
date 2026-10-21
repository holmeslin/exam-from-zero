pub trait Animal {
    fn name(&self) -> String;
    fn twin(&self) -> Self
    where
        Self: Sized;
}

#[derive(Clone)]
pub struct Cat {
    pub name: String,
}

pub struct Dog;

impl Animal for Cat {
    fn name(&self) -> String {
        self.name.clone()
    }
    fn twin(&self) -> Self {
        self.clone()
    }
}

impl Animal for Dog {
    fn name(&self) -> String {
        String::from("狗狗")
    }
    fn twin(&self) -> Self {
        Dog
    }
}

pub fn names(zoo: &[Box<dyn Animal>]) -> Vec<String> {
    let mut out = Vec::new();
    for a in zoo {
        out.push(a.name());
    }
    out
}
