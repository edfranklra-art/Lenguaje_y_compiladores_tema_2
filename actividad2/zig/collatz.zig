// zig
const std = @import("std");
fn collatz(n_param: u64) u64 {
    var n = n_param;
    var pasos: u64 = 0;
    while (n != 1) {
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        pasos += 1;
    }
    return pasos;
}
fn benchmark(n_max: u64) u64 {
    var totald_pasos: u64 = 0;
    var i: u64 = 1;
    while (i <= n_max) : (i += 1) {
        totald_pasos += collatz(i);
    }
    return totald_pasos;
}

pub fn main() !void {
    const n_limite: u64 = 100000;
    const resultado = benchmark(n_limite);

    const stdout = std.io.getStdOut().writer();
    try stdout.print("=== Zig (Nativa / LLVM) ===\n", .{});
    try stdout.print("El resultado total de pasos es : {}\n", .{resultado});
    try stdout.print("La Memoria estimada es: < 1.0000 MB (Asignacion estatica)\n", .{});
}