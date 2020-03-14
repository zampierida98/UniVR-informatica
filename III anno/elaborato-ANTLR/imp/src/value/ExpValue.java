package value;

import java.util.Objects;

public abstract class ExpValue<T> extends Value {

    private final T value;

    public ExpValue(T value) {
        this.value = value;
    }

    public T toJavaValue() {
        return value;
    }

    @Override
    public String toString() {
        return value.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ExpValue<?> expValue = (ExpValue<?>) o;

        return Objects.equals(value, expValue.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
