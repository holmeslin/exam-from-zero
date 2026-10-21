pub struct Pair<T> {
    pub first: T,
    pub second: T,
}

impl<T: Clone> Pair<T> {
    pub fn to_tuple(&self) -> (T, T) {
        (self.first.clone(), self.second.clone())
    }
}

impl<T: PartialOrd + Copy> Pair<T> {
    pub fn larger(&self) -> T {
        if self.first >= self.second {
            self.first
        } else {
            self.second
        }
    }
}
