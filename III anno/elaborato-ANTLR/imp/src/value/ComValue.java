package value;

import java.util.Objects;

public class ComValue extends Value {

    public static final ComValue INSTANCE = new ComValue();

    private ComValue() { }

    @Override
    public boolean equals(Object obj) {
        return this == obj;
    }

    @Override
    public int hashCode() {
        return 0;
    }
}
