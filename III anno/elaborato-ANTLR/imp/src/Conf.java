import value.ExpValue;

import java.util.HashMap;
import java.util.Map;

public class Conf {

    private final Map<String, ExpValue<?>> store;

    public Conf() {
        store = new HashMap<>();
    }

    public void put(String id, ExpValue<?> v) {
        store.put(id, v);
    }

    public ExpValue<?> get(String id) {
        return store.get(id);
    }
}
