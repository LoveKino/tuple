import assert from "assert";
import Tuple from "../index.js";

describe("base", () => {
    it("base", () => {
        let tuple = new Tuple();
        tuple.setList([1, 2, [3]]);
        let list = tuple.getList();
        assert.equal(list[0], 1);
        assert.equal(list[1], 2);
        assert.equal(list[2][0], 3);
    });

    it("append", () => {
        let tuple = new Tuple();
        tuple.setList([ 1 ]);

        let tuple2 = new Tuple();
        tuple2.setList([ 4 ]);

        tuple.append(2, 3, tuple2);
        assert.equal(tuple.getList().join(","), "1,2,3,4");
    });

    it("prepend", () => {
        let tuple = new Tuple();
        tuple.setList([ 1 ]);

        let tuple2 = new Tuple();
        tuple2.setList([ 4 ]);

        tuple.prepend(2, 3, tuple2);
        assert.equal(tuple.getList().join(","), "2,3,4,1");
    });

    it("getList", () => {
        let tuple = new Tuple();
        tuple.setList([ 1 ]);

        assert.equal(Tuple.getList(3), "3");
        assert.equal(Tuple.getList(tuple), "1");
    });

    it("unpack", () => {
        let tuple = new Tuple();
        tuple.setList([ 1 ]);

        let tuple2 = new Tuple();
        tuple2.setList([ 4 ]);

        let list = Tuple.unpack([ tuple, tuple2, 1, 3 ]);
        assert.equal(list.join(","), "1,4,1,3");
    });
});
